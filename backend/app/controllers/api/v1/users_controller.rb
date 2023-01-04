class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_request, only: %i[login register]
  before_action :set_user, only: [ :show, :update ]
  before_action :correct_user, only: [:edit, :update]

  # GET /users or /users.json
  def index
    @users = User.where(role: :user)

    render json: {data: @users}
  end

  def correct_user
    @user == current_user
  end


  # GET /users/1 or /users/1.json
  def show
    render json: @user
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end

  end

  def edit
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    if correct_user
      if @user.update(user_params)
        render json: {statusCode:200,data: @user}
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: {message: 'Incorrect user'}
    end


  end

  # DELETE /users/1 or /users/1.json
  # def destroy
  #   @user.destroy
  # end

  def register
    @user = User.create(user_params)
    if @user.save
      response = { message: 'User created successfully'}
      render json: response, status: :created
    else
      render json:{ message: 'has already been taken'}, status: :unprocessable_entity
    end
  end

  def login
    authenticate params[:email], params[:password]
  end

  def authenticate(email, password)
    command = AuthenticateUser.call(email, password)
    if command.success?
      render json: {
        message: 'Login Successful',
        data: {data: user_infor ,accessToken: command.result}
      }
    else
      render json: { message: "error email or password"}, status: :unauthorized
    end
  end
  def user_infor 
    user = User.find_by(email: params[:email])
  end

  def test
    render json: {
      message: 'You have passed  '
    }
  end
  def search
    find params[:username]
  end
  
  def find(username)
    user = User.where("username like ?", "%#{username}%")
    if user
      render json: user
    else
      render json: {message: 'Username name does not exists'}
    end
  end
  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.permit(:email, :password, :first_name, :last_name, :username, :birthday, :url_img, :phone_number, :address, :gender, :card_id, :role, :reset_password_token, :reset_password_at, :confirmation_token, :confirmation_at, :encrypted_password)
  end

end
