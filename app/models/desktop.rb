class Desktop < ActiveRecord::Base
  
  has_many :notes
  
  validates :name, presence: true
  
  before_create do
    self.slug = name.parameterize
  end
  
end
