class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]
  # Use Knock to make sure the current_user is authenticated before completing request.
  before_action :authenticate_user,  only: [:index, :current, :update]
  before_action :authorize_as_admin, only: [:destroy]
  before_action :authorize,          only: [:update]
  
  # Should work if the current_user is authenticated.
  def index
    @users = User.all
    render json: {status: 200, msg: 'Logged-in'}
  end
  
  # Call this method to check if the user is logged-in.
  # If the user is logged-in we will return the user's information.
  def current
    current_user.update!(last_login: Time.now)
    render json: current_user
  end
   # GET /users or /users.json

  # def index
  #   @users = User.all
  # end

  # GET /users/1 or /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users or /users.json
def create
    @user = User.new(user_params)

  #   respond_to do |format|
  #     if @user.save
  #       format.html { redirect_to user_url(@user), notice: "User was successfully created." }
  #       format.json { render :show, status: :created, location: @user }
  #     else
  #       format.html { render :new, status: :unprocessable_entity }
  #       format.json { render json: @user.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end
    
    if @user.save
      render json: {status: 200, msg: 'User was created.'}
    else
      render json: {error: @user.errors.full_messages}, status: :unprocessable_entity
    end
end


  # PATCH/PUT /users/1 or /users/1.json
  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: { status: 200, msg: 'User details have been updated.' }
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    user = User.find(params[:id])
  if user.destroy
    render json: { status: 200, msg: 'User has been deleted.' }
  end
  end

  private

  # Setting up strict parameters for when we add account creation.
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
  
  # Adding a method to check if current_user can update itself. 
  # This uses our UserModel method.
  def authorize
    return_unauthorized unless current_user && current_user.can_modify_user?(params[:id])
  end
    # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :username, :password, :birthday, :url_img, :phone_number, :address, :gender, :card_id, :role, :resend_password_token, :resend_password_at, :confirmation_token, :confirmation_at, :lock_at, :count_lock)
  end
end
