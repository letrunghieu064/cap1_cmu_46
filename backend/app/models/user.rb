class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # has_secure_password
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  validates_presence_of :email
  validates_presence_of :username
  validates_uniqueness_of :email
  validates_uniqueness_of :username
  validates_presence_of :password, if: :password_required?
  validates_confirmation_of :password, if: :password_required?
  validates :password,
            format: { with: /\A(?=.*\d)(?=.*[A-Z])(?=.*\W)[^ ]{6,}\z/,
                      message: 'Password should have more than 6 characters including 1 uppercase letter, 1 number, 1 special character'
                    }


  has_many :posts
  has_many :likes
  # has_many :follows

  def jwt_payload
    super
  end

  attr_accessor :login

  def self.find_for_database_authentication warden_condition
    conditions = warden_condition.dup
    login = conditions.delete(:login)
    where(conditions).where(
      ["lower(username) = :value OR lower(email) = :value",
      { value: login.strip.downcase}]).first
  end


end
