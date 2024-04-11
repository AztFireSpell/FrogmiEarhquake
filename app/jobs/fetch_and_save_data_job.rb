require 'open-uri'

class FetchAndSaveDataJob < ApplicationJob
  queue_as :default

  def perform
    url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
    response = URI.open(url)
    data = JSON.parse(response.read)
    
    data['features'].each do |feature|
      persist_feature(feature)
    end
end

private 

def persist_feature(feature)
  properties = feature['properties']
  coordinates = feature['geometry']['coordinates']

  return unless valid_feature?(properties, coordinates)

  Earthquake.find_or_create_by(usgs_id: feature['id']) do |f|
    f.magnitude = properties['mag']
    f.place = properties['place']
    f.time = Time.at(properties['time'] / 1000) # Convertir a formato de tiempo UNIX
    f.url = properties['url']
    f.tsunami = properties['tsunami']
    f.mag_type = properties['magType']
    f.title = properties['title']
    f.longitude = coordinates[0]
    f.latitude = coordinates[1]
  end
end

def valid_feature?(properties, coordinates)
  properties['title'].present? &&
    properties['url'].present? &&
    properties['place'].present? &&
    properties['magType'].present? &&
    coordinates[0].between?(-180.0, 180.0) &&
    coordinates[1].between?(-90.0, 90.0) &&
    properties['mag'].between?(-1.0, 10.0)
end
end
