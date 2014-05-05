URL = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/physical/ne_10m_land.zip

ne_10m_land.zip:
	curl -LO $(URL)

ne_10m_land.shp: ne_10m_land.zip
	unzip ne_10m_land.zip
	touch ne_10m_land.shp

land.json: ne_10m_land.shp
	topojson -o land.json ne_10m_land.shp