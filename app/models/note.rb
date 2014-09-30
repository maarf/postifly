class Note < ActiveRecord::Base
  
  TEXT_TYPE = "text"
  IMAGE_TYPE = "image"
  
  belongs_to :desktop
  
  validates :note_type, presence: true
  validates :note_type, inclusion: { in: [TEXT_TYPE, IMAGE_TYPE], message: "must be text or image" }
  validates :content,   presence: true
  validates :frame,     presence: true
  validates :frame,     format: { with: /\A\d+,\d+,\d+,\d+\z/ }
  
end
