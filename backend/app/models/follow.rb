class Follow < ApplicationRecord
  belongs_to :users, optional: true

end
