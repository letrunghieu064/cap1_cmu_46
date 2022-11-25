class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show update destroy ]
  before_action :authenticate_request
  before_action :correct_user, only: [ :update, :destroy]

  # GET /comments or /comments.json
  def index
    @comments = Comment.all

    render json: @comments
  end

  # GET /comments/1 or /comments/1.json
  def show
    render json: @comment
  end


  # GET /comments/new
  # def new
  #   @comment = Comment.new
  # end

  # GET /comments/1/edit
  # def edit
  # end

  # POST /comments or /comments.json
  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      render json: {data: @comment}, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end

  end

  # PATCH/PUT /comments/1 or /comments/1.json
  def update
    if correct_user
      if @comment.update(comment_params)
        render json: {data: @comment}
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    else
      render json: {message: 'Incorrect user'}
    end
  end

  # DELETE /comments/1 or /comments/1.json
  def destroy
    if correct_user
      @comment.destroy
      render json: {message: 'Delete comment successfully'}, status: :ok
    else
      render json: {message: 'Incorrect user'}
    end

  end

  def correct_user
    @comment = current_user.comments.find_by(id: params[:id])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.permit(:description, :post_id, :user_id)
    end

end
