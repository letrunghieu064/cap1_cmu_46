class FollowSerializer < ActiveModel::Serializer
  attributes :id, :follower_id, :following_id
  # belongs_to :users
end
