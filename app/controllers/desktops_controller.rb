class DesktopsController < ApplicationController
  respond_to :html, :json
  
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
  
  private
  
  def desktop_params
    params.require(:desktop).permit(:name)
  end
  
end
