class FollowSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :users
end
