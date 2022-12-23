class User < ApplicationRecord
  # has_secure_password
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates_presence_of :email
  validates_presence_of :username
  validates_uniqueness_of :email
  validates_uniqueness_of :username
  # validates_presence_of :password, if: :password_required?
  # validates_confirmation_of :password, if: :password_required?
  validates :password, if: :password_required?,
            format: { with: /\A(?=.*\d)(?=.*[A-Z])(?=.*\W)[^ ]{6,}\z/,
                      message: 'Password should have more than 6 characters including 1 uppercase letter, 1 number, 1 special character'
                    }

  

  enum role:[:user, :admin]
  after_initialize :set_default_role, if: :new_record?
  def set_default_role
    self.role ||= :user
  end

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  alias_method :authenticate, :valid_password?


  attr_accessor :login

  def self.find_for_database_authentication warden_condition
    conditions = warden_condition.dup
    login = conditions.delete(:login)
    where(conditions).where(
      ["lower(username) = :value OR lower(email) = :value",
      { value: login.strip.downcase}]).first
  end

  def send_password_reset
    self.reset_password_token = generate_base64_token
    self.reset_password_sent_at = Time.zone.now
    save!
    # UserMailer.password_reset(self).deliver_now
  end

  def password_token_valid?
    (self.reset_password_sent_at) > (Time.zone.now) - 1.hour
  end

  def reset_password(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end

  private

  def generate_base64_token
    test = SecureRandom.urlsafe_base64
  end


end
