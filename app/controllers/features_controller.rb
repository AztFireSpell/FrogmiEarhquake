class FeaturesController < ApplicationController
  def index
    @features = Earthquake.paginate(page: params[:page], per_page: 10)
  end

  def show
  end

  def paginate(features)
    features.paginate(page: params[:page], per_page: params[:per_page] || 10)
  end
end
