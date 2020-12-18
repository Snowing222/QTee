class Tshirt < ApplicationRecord
    belongs_to :user, optional: true
end
