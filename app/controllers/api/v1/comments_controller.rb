class Api::V1::CommentsController < ApplicationController
  def index
    comments = Comment.all
    render json: comments
  end

  def create

    earthquake = Earthquake.find_by(id: params[:earthquake_id])
    unless earthquake
      render json: { error: 'Feature not found' }, status: :not_found
      return
    end

    comment = earthquake.comments.build(body: params[:comment][:body])

    if comment.save
      render json: comment, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end

  end

end
