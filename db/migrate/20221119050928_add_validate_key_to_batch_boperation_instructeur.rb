class AddValidateKeyToBatchBoperationInstructeur < ActiveRecord::Migration[6.1]
  def change
    validate_foreign_key "batch_operations", "instructeurs"
  end
end
