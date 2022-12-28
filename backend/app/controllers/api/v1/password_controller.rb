class Api::V1::PasswordController < ApplicationController
  skip_before_action :authenticate_request
  attr_accessor :email, :password

  def forgot
    # user = User.find_by_email(params[:email])
    # if user.nil?
    #   user.send_password_reset and
    #   render json: {
    #     alert: "Successfuly"
    #   }
    # else
    #   #this sends regardless of whether there's an email in database for security reasons
    #   render json: {
    #     alert: "If this user exists, we have sent you a password reset email."
    #   }
    # end
    user = User.find_by(email: email)
    puts user
    user.send_password_reset if user
  end

  def reset
    user = User.find_by(reset_password_token: params[:reset_password_token])
    if user.present? && user.password_token_valid?
      if user.reset_password(params[:password])
        render json: {
          alert: "Your password has been successfuly reset!"
        }
        session[:user_id] = user.id
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: {error:  ['Link not valid or expired. Try generating a new link.']}, status: :not_found
    end
  end

end
