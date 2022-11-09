class User < ApplicationRecord
<<<<<<< HEAD
  has_many :post
  has_many :likes
  has_many :follow
  # Necessary to authenticate.
  has_secure_password
  
  # Basic password validation, configure to your liking.
  validates_length_of       :password, maximum: 72, minimum: 6, allow_nil: true, allow_blank: false
  validates_confirmation_of :password, allow_nil: true, allow_blank: false

  before_validation { 
    (self.email = self.email.to_s.downcase) && (self.username = self.username.to_s.downcase) 
  }

  # Make sure email and username are present and unique.
  validates_presence_of     :email
  validates_presence_of     :username
  validates_uniqueness_of   :email
  validates_uniqueness_of   :username

  # This method gives us a simple call to check if a user has permission to modify.
  def can_modify_user?(user_id)
    role == 'admin' || id.to_s == user_id.to_s
  end

  # This method tells us if the user is an admin or not.
  def is_admin?
    role == 'admin'
  end
=======
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
>>>>>>> 302eb69a6dd89198e4d0adde8f9e2dcfd143feb2

end
