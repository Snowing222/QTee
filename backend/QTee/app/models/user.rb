class User < ApplicationRecord
    has_many :tshirts
    accepts_nested_attributes_for :tshirts


end
