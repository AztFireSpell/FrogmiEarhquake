class Api::V1::CommentsController < ApplicationController

  before_action :set_earthquake, only: [:index, :create]
  before_action :set_comment, only: :show

  def index
    comments = @earthquake.comments
    render json: comments
  end

  def create

    if params[:earthquake_id].present?
      earthquake_id = params[:earthquake_id]
    else 
      earthquake_id = params[:feature_id]
    end

    earthquake = Earthquake.find_by(id: earthquake_id)
    unless earthquake
      render json: { error: 'El id de terremoto no existe' }, status: :not_found
      return
    end

    comment = earthquake.comments.build(body: params[:comment][:body])

    if comment.save
      render json: comment, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end

  end

  before_action :set_earthquake

  def show
    render json: @comment
  end

  private

  def set_earthquake
    @earthquake = Earthquake.find(params[:feature_id])
  end

  def set_comment
    @earthquake = Earthquake.find(params[:feature_id])
    @comment = @earthquake.comments.find(params[:id])
  end

end
