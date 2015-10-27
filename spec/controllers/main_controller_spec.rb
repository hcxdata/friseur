require 'rails_helper'

RSpec.describe MainController, type: :controller do

  describe "GET #root" do
    action { get :root }
    it { expect(response).to have_http_status(:success) }
  end

end
