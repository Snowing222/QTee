class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    
    
    @user = User.find_or_create_by(email: user_params[:email])
    @tshirt = @user.tshirts.create(size: user_params[:tshirts_attributes][:size], color: user_params[:tshirts_attributes][:color], img_src: user_params[:tshirts_attributes][:img_src])

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errorse_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:email,  tshirts_attributes: [:size, :color, :img_src])
    end
end
