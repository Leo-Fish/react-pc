import { makeAutoObservable } from "mobx"
import { http } from "@/utils"

class channelStore {
  constructor() {
    makeAutoObservable(this)
  }
  async getChannel () {
    this.channelList = []
    const res = await http.get('/channels')
    this.channelList = res.data.data.channels
  }
}

export default channelStore