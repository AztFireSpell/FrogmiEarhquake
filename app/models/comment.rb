class Comment < ApplicationRecord
  belongs_to :earthquake

  validates :body, presence: { message: "El payload debe contener un body valido, no vacio"}
end
