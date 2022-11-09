class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :img_url, :description,
             :status, :address, :user_id, :district_id
  # belongs_to :users
  # belongs_to :districts
  has_many :likes
  has_many :comments
end
