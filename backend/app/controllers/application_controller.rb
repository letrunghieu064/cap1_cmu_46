class ApplicationController < ActionController::API
<<<<<<< HEAD
  include Knock::Authenticable

  protected
  
  # Method for checking if current_user is admin or not.
  def authorize_as_admin
    return_unauthorized unless !current_user.nil? && current_user.is_admin?
  end
=======
>>>>>>> 302eb69a6dd89198e4d0adde8f9e2dcfd143feb2
end
