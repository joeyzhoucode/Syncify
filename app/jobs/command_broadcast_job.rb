class CommandBroadcastJob < ApplicationJob
  queue_as :default

  def perform(command)
    payload = {
      theatre_code: command.theatre.code,
      video_id: command.video_id,
      seek_seconds: command.seek_seconds,
      status: command.status,
      viewer: command.viewer,
      audience: command.theatre.viewers.collect(&:id)
    }

    ActionCable.server.broadcast(build_theatre_code(command.theatre.code), payload)
  end

  def build_theatre_code(code)
    "Theatre-#{code}"
  end
end