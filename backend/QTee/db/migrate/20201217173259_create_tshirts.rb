class CreateTshirts < ActiveRecord::Migration[6.0]
  def change
    create_table :tshirts do |t|
      t.string :img_src
      t.string :color
      t.string :size
      t.belongs_to :user

      t.timestamps
    end
  end
end
