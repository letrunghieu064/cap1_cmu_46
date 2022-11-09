class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates_presence_of :email
  validates_presence_of :password, if: :password_required?
  validates_confirmation_of :password, if: :password_required?
  validates :password,
            format: { with: /\A(?=.*\d)(?=.*[A-Z])(?=.*\W)[^ ]{6,}\z/,
                      message: 'Password should have more than 6 characters including 1 uppercase letter, 1 number, 1 special character'
                    }

  has_many :posts
  has_many :likes
  # has_many :follows

end
