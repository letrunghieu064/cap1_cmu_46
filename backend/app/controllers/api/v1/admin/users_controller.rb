class Api::V1::Admin::UsersController < AdminBaseController
  before_action :set_user, only: [:destroy ]

  def destroy
    @user.destroy
    render json: {message: "Delete user with id:#{@user.id} successfully"}, status: :ok
  end

  private
  def set_user
    @user = User.find(params[:id])
  end
end
