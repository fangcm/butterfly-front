import {fetch} from './api'
import { getCookie } from './util'

export function uploadClickStatistics(action) {
  if(getCookie('marketing_lft_identity_uniquecode'))
  {
    // fetch('/statistics/upload/'+getCookie('marketing_lft_identity_uniquecode')+'/1/'+action).then((res)=>{
    //   console.log(res)
    // })
  }
}

export function uploadLoadStatistics(action) {
  if(getCookie('marketing_lft_identity_uniquecode'))
  {
    // fetch('/statistics/upload/'+getCookie('marketing_lft_identity_uniquecode')+'/0/'+action).then((res)=>{
    //   console.log(res)
    // })
  }
}
