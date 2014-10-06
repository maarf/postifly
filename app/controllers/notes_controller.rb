class NotesController < ApplicationController
  respond_to :html, :json
  
  def create
    @note = Note.new(note_params)
    @note.save
    respond_with @note
  end
  
  def update
    @note = Note.find(params[:id])
    @note.update(note_params)
    respond_with(@note)
  end
  
  private
  
  def note_params
    params.require(:note).permit(:content, :desktop_id, :note_type, :frame)
  end
end
