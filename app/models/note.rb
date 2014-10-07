class Note < ActiveRecord::Base
  
  TEXT_TYPE = "text"
  IMAGE_TYPE = "image"
  
  belongs_to :desktop
  
  validates :note_type, presence: true
  validates :note_type, inclusion: { in: [TEXT_TYPE, IMAGE_TYPE], message: "must be text or image" }
  validates :frame,     presence: true
  validates :frame,     format: { with: /\A-?\d+,-?\d+,\d+,\d+\z/ }
  
  def top
    frame.split(',')[0]
  end
  
  def left
    frame.split(',')[1]
  end
  
  def width
    frame.split(',')[2]
  end
  
  def height
    frame.split(',')[3]
  end
  
end
