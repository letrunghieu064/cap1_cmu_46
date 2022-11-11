class Api::V1::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # def create
  #   user = User.new(user_params)

  #   if user.save
  #     render json: {message: "Registration has been completed",user: user}, status: :created
  #   else
  #     render json: user.errors, status: :unprocessable_entity
  #   end

  # end

  # private
  #   def user_params
  #     params.permit :email, :password, :username
  #   end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: {code: 200, message: 'Signed up sucessfully.'},
        data: resource
      }, status: :ok
    else
      render json: {
        status: {message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end

end
