from time import timezone
import httpx # for senidng http request for the uoft food json info
from bs4 import BeautifulSoup
import json # going to convert the list of places to json again to feed to frontend
import os # for writing into locations.json
from datetime import datetime

# the wordpress api endpoint that we get food data from
URL = "https://foodservices.utoronto.ca/wp-admin/admin-ajax.php"

PARAMS = { # search filters used by UofTs api to get all campus food locations
    "action": "store_search",
    "lat": "43.664422",
    "lng": "-79.399336",
    "max_results": "200",
    "search_radius": "50",
    "filter": "",
    "autoload": "1"
}

HEADERS = { # so that we can send http request
    "user-agent": "Mozilla/5.0",
    "x-requested-with": "XMLHttpRequest",
    "referer": "https://foodservices.utoronto.ca/where-to-eat/"
}


# high level: convert a SINGLE location's hours from HTML into python (an entry in the list).
# beautifulsoup usage, to extract text from HTML
def parseHours(hoursHTML):
    if not hoursHTML: return None

    # take hoursHTML and parse using built in "html.parser"
    soup = BeautifulSoup(hoursHTML, "html.parser") 

    # finds the table rows (since the hours are in <tr><tr> on Uoft's site)
    hoursRows = soup.find_all("tr") 

    hoursRes = {} # result

    # loop through the locations' open times (day and hours of week)
    for r in hoursRows:
        cols = r.find_all("td")
        if len(cols) == 2:
            # first col is day, second col is time open
            day = cols[0].get_text(strip=True)
            time = cols[1].get_text(strip=True)
            hoursRes[day] = time
    return hoursRes


# high level: similar to parseHours, but were parsing the food category from the HTML
# returns a string
def parseFoodType(foodHTML):
    if not foodHTML: return ""
    return BeautifulSoup(foodHTML, "html.parser").get_text(strip=True)

# fetch food locaiton info from the uoft API

# decode html entities like &amp for &
def decodeHTML(text: str) -> str:
    from html import unescape
    return unescape(text) if text else ""

print("Fetching locations from UofT Food Services API")
response = httpx.get(URL, params=PARAMS, headers=HEADERS, timeout=15, verify=False)
response.raise_for_status() # see if there is an error "404", etc
rawLocations = response.json() # parses as json

locations = []

for loc in rawLocations:
    locations.append({
        "id": loc.get("id"),
        "name": decodeHTML(loc.get("store") or ""),
        "address": f"{loc.get('address')}, {loc.get('city')}, {loc.get('state')}".strip(", "),
        "lat": float(loc.get("lat", 0)),
        "lng": float(loc.get("lng", 0)),
        "type": parseFoodType(loc.get("food")),
        "hours": parseHours(loc.get("hours")),     
        "hours_message": BeautifulSoup(loc.get("hoursmessage") or "", "html.parser").get_text(strip=True),
        "url": loc.get("url"),
        "last_updated": datetime.utcnow().isoformat()
    })


os.makedirs("public", exist_ok=True)
with open("public/locations.json", "w") as f:
    json.dump(locations, f, indent=2)

print(f"Written {len(locations)} locations to public/locations.json")





