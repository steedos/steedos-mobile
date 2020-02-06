import { encode as btoa } from 'base-64'
export function makeNewID(props){
    return props.id ? props.id : btoa(props.toString()) + Math.floor(Math.random() * 10000);
}

export * from './key_mirror'
export * from './accounts'
export * from './cookies'