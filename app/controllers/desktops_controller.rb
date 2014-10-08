class DesktopsController < ApplicationController
  respond_to :html, :json
  
  def index
    redirect_to Desktop.first
  end
  
  def show
    @desktops = Desktop.all
    @current_desktop = if params[:id] then Desktop.find(params[:id]) else Desktop.first end
    
    @notes = @current_desktop.notes
    @all_notes = Note.all
  end
  
  def create
    @desktop = Desktop.new(desktop_params)
    @desktop.save
    respond_with @desktop
  end
  
  def update
    @desktop = Desktop.find(params[:id])
    @desktop.update(desktop_params)
    respond_with(@desktop)
  end
  
  def destroy
    @desktop = Desktop.find(params[:id])
    @desktop.destroy
    respond_with(@desktop)
  end
  
  private
  
  def desktop_params
    params.require(:desktop).permit(:name)
  end
  
end
