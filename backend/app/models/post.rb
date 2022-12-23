class Post < ApplicationRecord
  belongs_to :user, optional: true
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

 

  geocoded_by :address
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }

  enum status:[:not_verified, :verified]
  after_initialize :set_default_role, if: :new_record?
  def set_default_role
    self.status ||= :not_verified
  end
end
