import {ReplaySubject} from 'rxjs';
import {convertToParamMap, ParamMap, Params} from '@angular/router';

/**
 * Utility providing routing parameters to Components under test.
 */
export class ActivatedRouteStub {
  private subject = new ReplaySubject<ParamMap>();

  // This is used, when Angular DI swaps this class for a real ActivatedRoute, but WebStorm can't see that.
  // noinspection JSUnusedGlobalSymbols
  readonly paramMap = this.subject.asObservable();

  /**
   * Create a new stub. When someone subscribes to paramMap, they will be notified of the value params.
   *
   * @param params The params that this ActiveRouteStub will represent.
   */
  constructor(params: Params) {
    this.subject.next(convertToParamMap(params))
  }
}
