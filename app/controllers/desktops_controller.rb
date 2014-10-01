class DesktopsController < ApplicationController
  
  def show
    @desktops = Desktop.all
    @current_desktop = if params[:id] then Desktop.find(params[:id]) else Desktop.first end
    
    @notes = @current_desktop.notes
  end
  
end
