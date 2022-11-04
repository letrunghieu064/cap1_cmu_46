class PostSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :users
  belongs_to :districts
  has_many :likes
  has_many :comments
end
