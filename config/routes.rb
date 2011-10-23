CodeMash::Application.routes.draw do
  root to: 'home#index'
  match "/javascript/specs" => "specs#index"
end
