class TshirtsController < ApplicationController
  before_action :set_tshirt, only: [:show, :update, :destroy]

  # GET /tshirts
  def index
    @tshirts = Tshirt.all

    render json: @tshirts
  end

  # GET /tshirts/1
  def show
    render json: @tshirt
  end

  # POST /tshirts
  def create
    @tshirt = Tshirt.new(tshirt_params)

    if @tshirt.save
      render json: @tshirt, status: :created, location: @tshirt
    else
      render json: @tshirt.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tshirts/1
  def update
    if @tshirt.update(tshirt_params)
      render json: @tshirt
    else
      render json: @tshirt.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tshirts/1
  def destroy
    @tshirt.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tshirt
      @tshirt = Tshirt.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def tshirt_params
      params.require(:tshirt).permit(:img_src, :color, :size, :likes)
    end
end
