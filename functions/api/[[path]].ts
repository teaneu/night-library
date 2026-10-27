import worker from '../../worker/index';
import type {Env} from '../../worker/types';
export const onRequest:PagesFunction<Env>=({request,env})=>worker.fetch(request,env);
