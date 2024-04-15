class Api::V1::FeaturesController < ApplicationController
  def index
    features = Earthquake.all

    per_page = params[:per_page].to_i
    if per_page >= 1000
      render json: {error: "El parametro per_page debe ser menor a 1000"}
      return
    end

    features = filter_by_mag_type(features)
    features = paginate(features)

    render json: {
      data: features.map { |feature| serialize_feature(feature) },
      pagination: {
        current_page: features.current_page,
        total: features.total_entries,
        per_page: features.per_page
      }
    }
  end

  def show
    earthquake = Earthquake.find_by(id: params[:id])
    if earthquake

      earthquake = serialize_feature(earthquake)
      render json:{
        data: earthquake
      } 
    else
      render json: {
        error: "Earthquake not found"
      }, status: :not_found
    end
  end

  def create
  end

  private

  def serialize_feature(feature)
    {
      id: feature.id,
      type: 'feature',
      attributes: {
        external_id: feature.usgs_id,
        magnitude: feature.magnitude,
        place: feature.place,
        time: feature.time.to_s,
        tsunami: feature.tsunami,
        mag_type: feature.mag_type,
        title: feature.title,
        coordinates: {
          longitude: feature.longitude,
          latitude: feature.latitude
        }
      },
      links: {
        external_url: feature.url
      }
    }
  end

  def filter_by_mag_type(features)
    return features unless params[:mag_type].present?
    mag_types = params[:mag_type].split(',')
    features.where(mag_type: mag_types)
  end

  def paginate(features)
    features.paginate(page: params[:page], per_page: params[:per_page] || 10)
  end
end
