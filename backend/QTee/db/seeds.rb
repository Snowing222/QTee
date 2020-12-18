# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.delete_all
Tshirt.delete_all
elsa = User.create(email:"elsa@gmail.com")
elsa.tshirts.create(size:"X", color:"white", img_src:"https://imgur.com/BkRNH5R")
