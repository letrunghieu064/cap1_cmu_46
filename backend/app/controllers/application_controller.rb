class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  # include Knock::Authenticable
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up,
        keys: [:username, :email, :password])
      devise_parameter_sanitizer.permit(:sign_in,
        keys: [:login, :password,])
    end


end
