import json
import requests

USGS_API_URL = 'http://comcat.cr.usgs.gov/fdsnws/event/1/query'

# METHOD = 'query'
PARAMS = {
    'starttime': '2014-03-01T21:59:59',
    'endtime': '2014-05-30T23:59:59',
    'minlatitude': -56,
    'maxlatitude': -18,
    'minlongitude': -79,
    'maxlongitude': -60,
    'minmagnitude':   5,
    'format': 'geojson'
}

if __name__ == '__main__':

    r = requests.get(USGS_API_URL, params=PARAMS)

    jsonfile = open('earthquakes.json', 'w')
    json.dump(r.json(), jsonfile)
    jsonfile.close()

