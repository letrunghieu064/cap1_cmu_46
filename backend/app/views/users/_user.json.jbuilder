json.extract! user, :id, :email, :first_name, :last_name, :username, :password, :birthday, :url_img, :phone_number, :address, :gender, :card_id, :role, :resend_password_token, :resend_password_at, :confirmation_token, :confirmation_at, :lock_at, :count_lock, :created_at, :updated_at
json.url user_url(user, format: :json)
