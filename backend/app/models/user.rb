class User < ApplicationRecord
  has_secure_password
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

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

  alias_method :authenticate, :valid_password?


  attr_accessor :login

  def self.find_for_database_authentication warden_condition
    conditions = warden_condition.dup
    login = conditions.delete(:login)
    where(conditions).where(
      ["lower(username) = :value OR lower(email) = :value",
      { value: login.strip.downcase}]).first
  end


end
