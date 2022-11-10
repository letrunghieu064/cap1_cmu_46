class Api::V1::RegistrationsController < Devise::RegistrationsController

  def create
    user = User.new(user_params)

    if user.save
      render json: {message: "Registration has been completed",user: user}, status: :created
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  private

    def user_params
      params.permit :email, :password
    end
end
