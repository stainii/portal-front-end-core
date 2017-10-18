/** This package contains event listeners, that listen to the application lifecyle.
 * For example: a "startup" event, a "cache should be refreshed" event, ...
 *
 * This logic is kept out of the services, to make the services independent of the
 * application lifecycle.
 *
 * Why shouldn't the services has knowledge of the application lifecycle?
 * At the moment of writing, micro services are pretty new to me, making
 * it uncertain that the application lifecycle works correctly/optimally.
 * I want to be able to change that easily when necessary.
 **/
package be.stijnhooft.portal.core.eventlisteners;